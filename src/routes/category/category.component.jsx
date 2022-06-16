import {useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import {CategoryContainer, CategoryTitle} from './category.styles.jsx';

import { selectCategoriesMap } from '../../store/categories/categories.selector';

const Category = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    
    const { category } = useParams();
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])


    return(
        <>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryContainer>
            {
                products && products.map((product) => <ProductCard key={product.id} product={product} /> )
            }
        </CategoryContainer>
        </>

    )
}

export default Category;