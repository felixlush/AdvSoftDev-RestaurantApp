import CategoryCard from "../ui/Categories/CategoryCard"
import burritoIcon  from "@/public/burritoIcon.jpg"
import tacoIcon  from "@/public/tacoIcon.jpeg"
import mainsIcon  from "@/public/mainsIcon.jpg"
import sidesIcon  from "@/public/sidesIcon.jpg"

export default function Categories(){

    const categories = [{name: "Main", imageURL: mainsIcon}, {name: "Burritos", imageURL: burritoIcon}, {name: "Taco", imageURL: tacoIcon}, {name: "Sides", imageURL: sidesIcon}]

    return (
        <>
        <h1 className="text-center text-2xl mt-5 font-bold tracking-widest p.with-eight" >Popular Categories</h1>
        <div className="flex gap-10 p-5 justify-center min-w-full mt-5">
            {categories.map((category) => (
                <CategoryCard key={category.name} name={category.name} imageURL={category.imageURL}/> 
            ))}
        </div>
        </>
    )
}