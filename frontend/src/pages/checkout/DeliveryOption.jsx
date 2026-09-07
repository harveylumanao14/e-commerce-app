import dayjs from 'dayjs'
import { formatMoneyToCents } from '../../utils/format'

const DeliveryOption = ({ deliveryOptions, cartItem }) => {
    return (
        <>
            {deliveryOptions.map((deliveryOption) => {
                return (
                    <div key={deliveryOption.id} className="delivery-options">
                        <div className="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        <div className="delivery-option">
                            <input type="radio" checked={cartItem.deliveryOptionId === deliveryOption.id}
                                className="delivery-option-input"
                                name={`delivery-option-${deliveryOption.id}`} />
                            <div>
                                <div className="delivery-option-date">
                                    {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                </div>
                                <div className="delivery-option-price">
                                    {deliveryOption.priceCents > 0 ? `${formatMoneyToCents(deliveryOption.priceCents)} - Shipping` : 'FREE Shipping'}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default DeliveryOption