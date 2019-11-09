  
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import Header from '../Header';
import SupplierSidebar from './SupplierSideBar'
import Footer from '../Footer';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';
require('dotenv').config()

const API = process.env.REACT_APP_BASEURL

export default class LiveRequests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            requests: []
        }
    }
   async componentDidMount() {
      if (window.localStorage.getItem('token') == null || window.localStorage.getItem('token') == '') {
        return <Redirect to="/login"/>
      }
      await this.getRequests()
    }
    async getRequests() {
        const token = window.localStorage.getItem('token');
        try {
            const requests = await axios.get(`${API}/supplier/liveRequests`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (requests.data.status == "success") {
                this.setState({
                    requests: requests.data.data.requests,
                    loading: false
                });
            }
        }
        catch(err) {
            alert(err.response.data.payload.message)
            this.setState({
              loading: false,
              message: err.response.data.payload.message
            });
        }
    }

    render() {
        const { requests } = this.state;
        return (
            <div>
                <Header />
                <div id="wrapper">
                <SupplierSidebar />
                <div id="content-wrapper">
               <div className="container-fluid">

          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Welcome!</li>
          </ol>

          <div className="card mb-3">
            <div className="card-header">

              <i className="fas fa-table"></i>
                &nbsp; Live Requests</div>
                
            <div className="card-body">
            <div class="table-responsive">
           <p> <i className="fas fa-info"></i>&nbsp; You can click on the request to bid for it</p>
            <Dots animating={this.state.loading}/>
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Machine name</th>
                      <th>Year</th>
                      <th>Model</th>
                      <th>Capacity</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Post Date</th>
                      <th>Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => {
                       return (
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td><Link to={`/supplier/bid/${request._id}`}>{request.machine_name}</Link></td>
                        <td><Link to={`/supplier/bid/${request._id}`}>{request.year}</Link></td>
                        <td><Link to={`/supplier/bid/${request._id}`}>{request.model}</Link></td>
                        <td><Link to={`/supplier/bid/${request._id}`}>{request.capacity}</Link></td>
                        <td><Link to={`/supplier/bid/${request._id}`}>{request.location}</Link></td>
                        <td><Link to={`/supplier/bid/${request._id}`}>{request.status}</Link></td>
                        <td><Link to={`/supplier/bid/${request._id}`}>{moment(request.post_date).format('YYYY-MM-DD HH:mm:ss')}</Link></td>
                        <td><Link to={`/supplier/bid/${request._id}`}>{moment(request.timeline).format('YYYY-MM-DD HH:mm:ss')}</Link></td>
                      </tr>
                       )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
        <Footer />
            </div>
            </div>
            </div>
        );
    }
}