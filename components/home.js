import DineOption from "./dineoption";
import FoodOption from "./foodoption";
import GroceryOption from "./groceryoption";
import Header from "./header";

export default function Home(){
    return (
    <>
    <Header></Header>
    <FoodOption></FoodOption>
    <GroceryOption></GroceryOption>
    <DineOption></DineOption>
    </>
    )
}