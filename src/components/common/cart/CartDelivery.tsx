import { observer } from 'mobx-react-lite';
import { deliveries } from '../../../mocks/deliveries';
import { cartStore } from '../../../store/cartStore';
import Title from '../../ui/Title';

const CartDelivery = observer(() => {
    return (
        <div>
            <Title type="h2" className="mb-8">
                Delivery options
            </Title>
            <div className="grid gap-2 lg:grid-cols-3 lg:gap-4 mb-8">
                {deliveries.map((delivery) => (
                    <label
                        htmlFor={delivery.name}
                        key={delivery.id}
                        className="flex items-center border border-black/10 rounded-lg p-4 gap-4 cursor-pointer has-checked:border-sky-500 has-focus-within:ring-1 has-focus-within:ring-sky-500"
                    >
                        <input
                            onChange={() => cartStore.setDelivery(delivery)}
                            name="delivery"
                            type="radio"
                            id={delivery.name}
                            className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-sky-500 checked:ring-sky-500"
                            checked={cartStore.delivery?.id === delivery.id}
                        />
                        <div className="flex flex-col grow">
                            <span className="font-bold">{delivery.name}</span>
                            <span className="text-sm text-slate-500 font-semibold">
                                {delivery.estimatedTime}
                            </span>
                        </div>
                        <div className="text-sky-500 font-bold">
                            {delivery.price}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
});

export default CartDelivery;
