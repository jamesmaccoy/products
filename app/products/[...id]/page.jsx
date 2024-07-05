import Product from '../../components/Product';

import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';



export async function generateStaticParams(){
    const products = await getDocs(collection(db, 'products'));
    return products.docs.map((doc) => ({ id: [doc.id], ...doc.data() })); // Ensure id is an array
}

async function getProducts(ids){
    const promises = []
    for (const id of ids){
        promises.push(getDoc(doc(db, 'products', id))) // Use doc instead of firestoreDoc
    }
    const products = await Promise.all(promises);
    return products.map((product, index) => ({ id: ids[index], ...product.data() }));

}
    

export default async function ProductPage({params}){
    const ids = Array.isArray(params.id) ? params.id : [params.id]; // Ensure ids is an array
    const products = await getProducts(ids);
    const product = products[0]; // Assuming you want to display the first product
    const { name, coverAmount, description, premium, category, image } = product;
    console.log({ name, coverAmount, description, premium, category, image });
   
   
    return products.length > 0 && (
                products.map(({id, name, coverAmount, description, premium, category, image}) => (
                    <Product noButton name={name} coverAmount={coverAmount} description={description} premium={premium} category={category} image={image} key={id} />
                ))
            )
    
}
