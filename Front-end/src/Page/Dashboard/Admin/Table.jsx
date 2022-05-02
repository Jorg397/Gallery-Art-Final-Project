import React from 'react'

export default function Table({data, header}) {
    console.log (data)

  return (
    <div>
        <table>
            <thead>
                <tr>
                    {header.map((item, index) => {
                        return <th key={index}>{item}</th>
                    }
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return <tr key={index}>
                        <td>{item.order_id}</td>
                        <td>{item.order_date}</td>
                        <td>{item.order_status}</td>
                        <td>{item.amount}</td>
                    </tr>
                })}
                
  

            </tbody>
        </table>
    </div>
  )
}
