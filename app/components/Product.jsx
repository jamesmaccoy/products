'use client'
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  documentId,
} from 'firebase/firestore';
import { db } from '@/app/firebase'
import ProductButton from './ProductButton';

export default function Product({id, name, coverAmount, noButton = false}) {

    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", coverAmount: 1000 },
        { id: 2, name: "Product 2", coverAmount: 2000 },
        { id: 3, name: "Product 3", coverAmount: 3000 },
      ]);
      const [newProduct, setNewProduct] = useState({ name: '', coverAmount: '' });
      const [total, setTotal] = useState(0);
    
        // Add Products to database
        const addProduct = async (e) => {
          e.preventDefault();
          if (newProduct.name !== '' && newProduct.coverAmount !== '') {
            // setItems([...items, newItem]);
            await addDoc(collection(db, 'products'), {
              name: newProduct.name.trim(),
              coverAmount: newProduct.coverAmount,
              //user: user.uid,
            });
            setNewProduct({ name: '', coverAmount: '' });
          }
        };
    
       // Read items from database
       useEffect(() => {
        const q = query(collection(db, 'products'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let productsArr = [];
    
          querySnapshot.forEach((doc) => {
            productsArr.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productsArr);
    
          // Read total from itemsArr
          const calculateTotal = () => {
            const totalPrice = productsArr.reduce(
              (sum, product) => sum + parseFloat(product.price),
              0
            );
            setTotal(totalPrice);
          };
          calculateTotal();
          return () => unsubscribe();
        });
      }, []);
    
      // Delete items from database
      const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'products', id));
      };
    
      useEffect(() => {
        setTotal(products.reduce((acc, product) => acc + product.coverAmount, 0));
      }, [products]);

    return (
             
        
<div className="bg-gray-200 p-4 rounded-lg">
  <form className="grid grid-cols-6 gap-4 items-center">
    <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="col-span-3 p-3 border-2 border-gray-300 rounded-lg mx-2" type="text" placeholder="Add a product" />
    <input value={newProduct.coverAmount} onChange={(e) => setNewProduct({ ...newProduct, coverAmount: e.target.value })} className="col-span-2 p-3 border-2 border-gray-3000 rounded-lg mx-3" type="number" placeholder="Cover amount" />
    <button onClick={addProduct} className="col-span-2 p-3 border-2 border-gray-300 rounded-lg mx-2" type="submit">Add</button>
  </form>
  <ul>
    {products.map((product, id) => (
     <li key={id} className="my-4 w-full flex justify-between items-center bg-gray-300">
      <div className="p-4 w-full flex justify-between">
        <span className="capitalize">{product.name}</span>
        <span>{product.coverAmount}</span>

       {
        !noButton &&
        <ProductButton id={product.id} />
       } 
      </div>
      <button onClick={() => deleteProduct(product.id)} className="ml-8 p-4 border-1-2 border-slate-900 hover:bg-slate-900 hover:text-white  w-16">Remove</button>
     </li>
    ))}
  </ul>
</div>
      
    )
}