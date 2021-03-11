
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');


function updateCart(data) {
    axios.post('/cart', data)
        .then(res => {
            cartCounter.innerText = res.data.totalQty;
            toastr.options = {
                "positionClass": "toast-top-right",
                "showDuration": "0",
                "hideDuration": "0",
                "timeOut": "1000",
                "extendedTimeOut": "0",
            }
            toastr.success('Item added to cart')
        })
};


addToCart.forEach((item) => {
    item.addEventListener('click', (e) => {
        let data = { id: item.dataset.dish };
        updateCart(data)
    })
});

const altmsg = document.querySelector('#success-alert');

if (altmsg) {
    setTimeout(() => {
        altmsg.remove()
    }, 2000)
}


let updateMenu = document.querySelectorAll('.updateMenu')
let myModal = document.querySelector('#myModal')

updateMenu.forEach((item) => {
    item.addEventListener('click', (e) => {
        let data = { id: item.dataset.id };
        Update_menu(data)
    })
});

function Update_menu(data) {
    axios.post('/admin/update', data)
        .then(res => {
            document.querySelector('#id').value = res.data.data._id
            document.querySelector('#name').value = res.data.data.name
            document.querySelector('#price').value = res.data.data.price
        })
};



///   delete Admin 
// let deleteMenu = document.querySelectorAll('.deleteMenu');

// deleteMenu.forEach((item) => {
//     item.addEventListener('click', (e) => {
//         let data = {id: item.dataset.id}
//         deleteDish(data)
//     })
// })

// function deleteDish(data){
//     axios.delete('/admin/delete/dish',data).then(res => {
//         console.log(res)
//     })
// }

