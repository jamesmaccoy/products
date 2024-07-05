
import Product from "../components/Product"

async function getProducts() {
  const products = await getDocs(collection(db, 'products'));
  return products.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}


export default async function Products() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-2xl font-bold">Beneficiaries</h1>
         <Product />
      </div>
    </main>
  );
}