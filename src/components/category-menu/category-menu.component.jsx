import "./category-menu.styles.scss";
import CategoryItem from "../category-item/category-item.component";

const CategoryMenu = ({ categories }) =>
{
    return (
        <div className='category-menu-container'>
    
          { categories.map( (category) =>
          (
            <CategoryItem key={category.id} category={category}/>
          )) }
          
        </div>
    )
}


export default CategoryMenu;