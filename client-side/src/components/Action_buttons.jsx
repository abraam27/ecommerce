import { IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";



const Action_buttons = (props) => {
   
    let items = [];
    const {item} = props;
    const addToLocalStorage =(data)=>{
        localStorage.setItem("data-cart",JSON.stringify(data));
        window.dispatchEvent(new Event('storage'));
      };
    
      const dataLoca = ()=>{
        let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
        if (dataLocal != null && dataLocal.length > 0){
          items = dataLocal;
        }
      }
      //add in cart function
      const addItem = (item)=>{
        dataLoca();
        let exist = items?.find((elm)=>elm._id === item._id);
        if (exist) {
          let cart =items?.map((elm)=>elm._id===item._id?{...exist,qty:exist.qty+1}:elm);
          addToLocalStorage(cart);
        }else{
  
          let itemAraay = [...items , {...item,qty:1}];
          addToLocalStorage(itemAraay);
        }
      };

  
      const removeItem = (item)=>{
        dataLoca()
        let exist = items.find((elm)=>elm._id === item._id);
        if (exist.qty > 1) {
          let cart =items.map((elm)=>elm._id===item._id?{...exist,qty:exist.qty-1}:elm);
          addToLocalStorage(cart)
        }else{
           removeProduct(item);
        }
      };
      const removeProduct = (item)=>{
        dataLoca()
        let cart = items.filter((elm)=>elm._id !== item._id);
        addToLocalStorage(cart)
    };
  
    return (
    <>

     <button onClick={()=>{addItem(item)}} className='btn btn-info text-center'><IoAdd className="action-Btn"/></button>
     <span className="px-3">{item.qty}</span>
     <button onClick={()=>{removeItem(item)}} className='btn btn-warning me-3'><AiOutlineMinus  className="action-Btn"/></button>
     <button onClick={()=>{removeProduct(item)}} className="btn btn-danger ml-3"><BiTrash className="action-Btn"/></button>


    
    
    
    </>
  )
}

export default Action_buttons