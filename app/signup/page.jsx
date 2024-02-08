import { ProgressBar, SignUp } from "@/components/constant";
import { Suspense } from "react";


const Page = () => {
 
  

  return (
    <Suspense fallback={<ProgressBar/>}>
    <SignUp/>
    </Suspense>
  )
}

export default Page;
