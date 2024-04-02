import Banner from "@/components/Banner";
import Product from "@/components/Product";
import type {ProductProps} from '../../type'


interface Props {
  productData:ProductProps
}

export default function Home({productData}:Props) {
 
  return (
   <main>
    <div className="max-w-screen-2xl mx-auto">
      <Banner/>
     <div className="relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
     <Product productData={productData}/>
     </div>
    </div>
   </main>
  );
}

// ssr for data fetching
export const getServerSideProps=async()=>{
  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  const productData = await res.json();
  return {props:{productData}}
};