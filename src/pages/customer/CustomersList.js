import React, { useState, useEffect } from "react";
import { getCustomers } from "../../services/firebase";
import { Link } from "react-router-dom";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomersFirebase = () => {
      getCustomers()
        .then(res => {
          console.log(res);
          setCustomers(res);
        })
        .catch(e => {
          console.log(e);
        });
    };
    getCustomersFirebase();
  }, []);

  return (
    <div>
      {customers.map((customer, key) => (
        <div>
          <div key={key}>
            <figure>
              <img src={customer.logo} alt={customer.name} />
            </figure>
            <Link to={`/customers/${customer.id}`}>
              <p>{customer.name}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomersList;
