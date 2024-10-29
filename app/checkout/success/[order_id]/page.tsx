'use client'
import React, { useEffect, useState } from 'react';
import { getOrderItemsByID, getOrderByID } from '@/app/lib/data';
import { Order, OrderItem } from '@/app/lib/definitions';
import OrderViewPanel from '@/app/ui/Account/Dashboard/OrderViewPanel';
import Image from 'next/image';

interface OrderSuccessProps {
  params: { order_id: string };
}

const page = ({ params }: OrderSuccessProps) => {
  const { order_id } = params;
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let total = 0;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await getOrderByID(order_id);
        setOrder(result);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchOrderItems = async () => {
      try {
        const result = await getOrderItemsByID(order_id);
        setOrderItems(result);
      } catch (err) {
        console.error('Failed to fetch order items:', err);
        setError('Failed to fetch order items.');
      }
    };

    fetchOrder();
    fetchOrderItems();
  }, [order_id]);

  const closeOrderPanel = () => {
    return;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <div className="flex justify-center p-10 pt-40">
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition w-full">
          {order && (
            <div>
              <div className="flex p-5">
                <h1 className="font-bold tracking-wide text-xl p-2 mr-auto">
                  Thanks for ordering!
                </h1>
              </div>
              <div className='p-5 mt-5 tracking-wide mb-6 bg-white rounded-lg shadow-md'>
                <p className='text-lg font-semibold '>Order Details:</p>
                <p>Order ID: {order.order_id}</p>
                <p>Total Amount: ${order.total_amount}</p>
              </div>
              {orderItems && (
                <div className="gap-4 mt-5 p-8">
                  {orderItems.map((orderItem) => (
                    <div
                      key={orderItem.order_item_id}
                      className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-md hover:scale-105"
                    >
                      <div className="w-1/3">
                        {orderItem.image_url && (
                          <Image
                            src={orderItem.image_url}
                            width={100}
                            height={100}
                            alt={`${orderItem.item_name} Cart item icon`}
                          />
                        )}
                      </div>

                      <div className="flex flex-col w-2/3 pl-4">
                        <h2 className="font-medium">{orderItem.item_name}</h2>
                        <p className="font-light text-sm text-gray-500">
                          {orderItem.description}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <p className="text-gray-900 font-semibold">
                            ${orderItem.quantity * orderItem.price}
                          </p>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-green-600">
                              x {orderItem.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p className="text-lg font-semibold">
                      Total: ${orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
