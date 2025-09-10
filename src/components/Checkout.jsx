import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp"
import Error from "./Error";
import { useActionState } from "react";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const {
        data,
        error,
        clearData,
        sendRequest } = useHttp('http://localhost:3000/orders', requestConfig)

    const cartTotlal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    function handleClose() {
        userProgressCtx.hideCheckout()
    }
    function handleFinish() {
        userProgressCtx.hideCheckout()
        cartCtx.clearCart()
        clearData()
    }
    async function checkoutAction(prevState, fd) {
        const customerData = Object.fromEntries(fd.entries())
        await sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );
    }
    const [fromState, formAction, isSending] = useActionState(checkoutAction, null)
    let actions = (
        <>
            <Button type="button" textOnly={true} onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>)
    if (isSending) {
        actions = <span>Sending Order data ...</span>
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose} >
            <h2>Success!</h2>
            <p> Your order was submitted successfuly!</p>
            <p> We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>OK</Button>
            </p>
        </Modal>
    }

    return <Modal className="cart" open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <form action={formAction}>
            <h2>Checkout</h2>
            <p>Total Amount : {currencyFormatter.format(cartTotlal)}</p>
            <Input label="Full Name" id="name" type="text" />
            <Input label="Email Address" id="email" type="emal" />
            <Input label="Street" id="street" type="text" />
            <div className="control-row">
                <Input label="Postal Code" id="postal-code" type="text" />
                <Input label="City" id="city" type="text" />
            </div>
            {error && <Error title="Failed to submit order" message={error} />}
            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}