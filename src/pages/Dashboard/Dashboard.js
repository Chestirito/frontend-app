import React, { Component } from 'react';
import './Dashboard.scss';

import { LeftSidebar, TransferModal, DoughnutChart, LineChart, ChartTable, TransactionTable, Footer } from './../../components';

class Dashboard extends Component{

    state={
        expiry : 0,
        interval : 0,
        alerted : false
    }

    componentDidMount = () =>{
        let expiry = sessionStorage.getItem("expiry");
        this.setState({expiry: expiry});
        this.state.interval = setInterval(this.checkSession, 2000);
    }

    checkSession = () =>{
        const currentTime = new Date();
        let {expiry, alerted} = this.state;
        if(currentTime.getTime() > expiry){
            clearInterval(this.state.interval);
            this.props.history.push('/signin');
        }

        if(expiry - currentTime.getTime() < 10000 && !alerted){
            alert("Session is expiring");
            this.state.alerted = true;
        }
    }

    render(){
         return (
            <div className="dashboard-container">
                <div className="navigation">
                    <LeftSidebar/>
                </div>
                <div className="content-wrapper" id="content-div">
                    <div className="overview-container">
                        <div className="overview-table"><ChartTable/></div>
                        <div className="overview-graph"><DoughnutChart /></div>
                    </div>
                    <div className="graph-container"><LineChart /></div>
                    <div className="table-container"><TransactionTable /></div>
                    <div className="transfer-modal-container"><TransferModal/></div>
                    <div className="footer-container"><Footer/></div>
                </div>
            </div>
        );
    }



}

export default Dashboard;
