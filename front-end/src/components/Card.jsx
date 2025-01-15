import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAth";
import useCart from "../hooks/useCart";

const Card = ({ item }) => {
  const { user } = useAuth();
  const { _id, code, name, image, category, price } = item;
  const [cart,refetch] = useCart();

  const navigate = useNavigate()
  const location = useLocation();

  //handle add to cart option
  const handleAddToCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: item._id,
        name: item.name,
        code: item.code,
        category: item.category,
        quantity: 1,
        image: item.image,
        price: item.price,
        email: user.email,
      };
      //console.log(cartItem);
      fetch("http://localhost:3001/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(cartItem);
          if (data._id) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          } else if(data.existId){
            Swal.fire({
              title: "The item is already Added, Try another One",
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login !!",
        text: "Haven't an Account, Please Signup",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup",
      }).then((result) => {
        if (result.isConfirmed) {
          //if didi=n't have an account, then should redirect to the signup page
          navigate('/signup',{state:{from:location}})
        }
      });
    }
    refetch();
  };

  return (
    <div>
      <div className="card bg-gray-200 h-[60vh] w-auto shadow-xl hover:shadow-2xl">
        <figure className="w-full h-30 sm:h-[15vh] md:h-[35vh]">
          <img src={item.image} alt="" className="object-cover h-full w-full" />
        </figure>
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title h-12 sm:h-auto text-black text-auto line-clamp-2">
            {item.name}
          </h2>
          <div className="space-y-3">
            <div className="font-semibold text-blue-800">{item.price} LKR</div>
            <div className="card-actions mb-0 justify-center">
              <button 
              onClick={()=>handleAddToCart(item)}
              className="image text-[8px] sm:text-lg md:text-lg btn  btn-primary bg-white border-gamboge hover:bg-gamboge hover:text-white px-1 py-1 sm:px-4 sm:py-2">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    code: PropTypes.string,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
