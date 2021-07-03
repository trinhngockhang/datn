import React, { useState, useEffect } from 'react';
import request from '../../../utils/request';
import { Bar, Doughnut } from 'react-chartjs-2';

export default function Statistic() {

    const [items, setItems] = useState();
    const [orders, setOrders] = useState();
    const optionItem = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      
    useEffect(()=> {
        getData();
    }, [])
    const getData = async () => {
        const requestApi = request();
        const res = await requestApi('/order/statistic');
        console.log(res.data.items);
        setItems(res.data.items);
        setOrders(res.data.orders);
    }
    return (
        <div>
            <div style={{width: '43%'}}>
            <h3>Thống kê đơn hàng</h3>
            {
                orders?
                <Bar data={orders} options={optionItem} />: <></>
            }
           </div>
           <div style={{width: '43%'}}>
           <h3>Thống kê sản phẩm</h3>

           {
               <Doughnut data={items}/>
           }
     </div>
        </div>
    )
}