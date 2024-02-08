
import { Stories ,MiniProfile, Posts, ProgressBar} from "./constant";


const Feed = () => {
  
  return (
   //stories
    <section className="realtive flex items-start space-x-8 justify-center md:max-w-5xl max-w-2xl mx-auto  py-2 px-3 border-none ">
 
      {/* ---------------- left side ------------------*/}
      <div className="md:flex-[1.5]  flex items-center flex-col ">
         <Stories />
         <Posts />
      </div>
       {/* ---------------- left side ------------------*/}

       {/* ---------------- right side ------------------*/}
      <div className="md:flex-[0.5] md:flex flex-col hidden  ">
        <MiniProfile />
      </div>
       {/* ---------------- right side ------------------*/}
   
    </section>
  )
}

export default Feed