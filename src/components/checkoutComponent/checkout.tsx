import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { fetchJob } from '../../store/job/jobActions';
import { StoreState } from '../../store/store';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TextField,
} from '@material-ui/core';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { JobAttributes } from '../../store/job/jobInterface';

interface RouteParams {
  id: string;
}

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const { user, job } = useSelector((state: StoreState) => state);
  const { id } = useParams<RouteParams>();
  const [price, setPrice] = useState('');
  useEffect(() => {
    const getJob = () => {
      return new Promise(res => {
        res(dispatch(fetchJob(id)));
      }).then((data: JobAttributes) => {
        setPrice(String(data.price));
      });
    };
    getJob();
  }, []);
  const difference = parseFloat(
    (parseFloat(price) - job.job.funded).toFixed(2)
  );
  const applicationFee = parseFloat(Math.max(difference * 0.1, 1.0).toFixed(2));
  const total = difference + applicationFee;
  const history = useHistory();
  const handleToken = async (token, addresses) => {
    const response = await axios.post('/api/payment/stripe/checkout', {
      token,
      addresses,
      total,
      user,
      job: job.job,
      price: price,
    });
    const { status } = response.data;
    if (status === 'success') {
      toast('Success! You have checked out!', { type: 'success' });
      history.push('/account');
    } else {
      toast('Error checking out!', { type: 'error' });
    }
  };
  return (
    <div>
      {!job.job ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <h2>{job.job.name} Checkout Page</h2>
          <TextField
            value={price}
            onChange={e => {
              e.stopPropagation();
              setPrice(e.target.value);
            }}
            label="Target Price"
          />
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Job</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Funded</TableCell>
                  <TableCell align="right">Amount Needed</TableCell>
                  <TableCell align="right">User</TableCell>
                  {/* <TableCell align="right">Image</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={job.job.id}>
                  <TableCell component="th" scope="row">
                    {job.job.name}
                  </TableCell>
                  <TableCell align="right">{price}</TableCell>
                  <TableCell align="right">{job.job.funded}</TableCell>
                  <TableCell align="right">{difference}</TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  {/* <TableCell align="right">
                    <img
                      src={job.job.images[0].url}
                      alt="job"
                      height={125}
                      width={155}
                    />
                  </TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <h3>Total</h3>
            <br />
            <hr />
            <span>Amount Needed: ${difference}</span>
            <br />
            <hr />
            <span>Application Fee: ${applicationFee} </span>
            <br />
            <hr />
            <span>Total: {total}</span>
            <hr />
            <StripeCheckout
              stripeKey="pk_test_51HQb6CE7ag3tHwtoywBsVrSo0kouJGEUUBUT6wVztfN4vo7qpNv1tHFjMj5JbBAQy0ytr1SvzjS3fvQ7AR4eJqYA00AYgeIALr"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              token={(token, addresses) => handleToken(token, addresses)}
              amount={total * 100}
              name="Skrap Litter"
              billingAddress
              shippingAddress
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
