import React from 'react'
import "../../scss/reactSidebar.scss";
import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import { AiOutlineArrowRight } from "react-icons/ai";
import Piechart from '../Charts/Piechart';

const SidebarPro = ({ dineinTabs, paymentStatus, startBillNum, endBillNum, FoodBeverageSum, toggleArrow }) => {
    const { collapseSidebar } = useProSidebar();
    const netTotalSale = dineinTabs.netTOTALSALES;
    const numGuest = dineinTabs.TotalGuests;
    let revenuePerGuest = netTotalSale / numGuest;

    const checkNan= (sales)=>{
        if(sales){
            let value = parseInt(sales).toLocaleString(undefined, { maximumFractionDigits: 3 });
            return value
        }
        else{
            return ""
        }
    }
    return (
        <div className='sidebar'>
            <main onClick={toggleArrow}>
                <button onClick={() => collapseSidebar()} className="btn-sidebar" >{<AiOutlineArrowRight className='icon-arrow' />}</button>
            </main>
            <Sidebar>
                <div className='dine-tabs-list'>
                    <div className='bill-no'>
                        <div className='start-bill-no'>
                            <label><span>Starting Bill No : </span>{startBillNum}</label>
                        </div>
                        <div className='end-bill-no'>
                            <label><span>Ending Bill No : </span>{(endBillNum === "") ? "-" : endBillNum}</label>
                        </div>
                        <div className='total-guest'>
                            <label><span>Total No. of Guest : </span>{(dineinTabs.TotalGuests === "") ? "-" : dineinTabs.TotalGuests}</label>
                        </div>
                        <div className='revenue'>
                            <label><span>Revenue Per Guest : </span>{(revenuePerGuest === "") ? "-" : revenuePerGuest.toFixed(2)}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <div className='total-info'>
                        <label> <span>Total Sales : </span> {checkNan(dineinTabs.TOTALSALES)}</label>
                        <div className='info'>
                            <label><span>Dine-In : </span>{checkNan(dineinTabs.DineInSALES)}</label>
                        </div>
                        <div className='info'>
                            <label><span>Tabs : </span>{!dineinTabs.TabSALES ? "0" : checkNan(dineinTabs.TabSALES)}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <div className='total-info'>
                        <label> <span>Total Net Sales : </span>{checkNan(dineinTabs.netTOTALSALES)}</label>
                        <div className='info'>
                            <label><span>Dine-In : </span>{checkNan(dineinTabs.netDineInSALES)}</label>
                        </div>
                        <div className='info'>
                            <label><span>Tabs : </span>{!dineinTabs.netTabSALES  ? "0" : dineinTabs.netTabSALES}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <div className='total-info'>
                        <label> <span>Total VAT: </span>{checkNan(dineinTabs.TotalVat)}</label>
                        <div className='info'>
                            <label><span>Dine-In : </span>{checkNan(dineinTabs.DineInVAT)}</label>
                        </div>
                        <div className='info'>
                            <label><span>Tabs : </span>{dineinTabs.TabVAT = dineinTabs.TabVAT ?? "0"}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <div className='total-info'>
                        <label> <span>Total Service Charge : </span>{checkNan(dineinTabs.TotalServiceCharge)}</label>
                        <div className='info'>
                            <label><span>Dine-In : </span>{checkNan(dineinTabs.DineInServiceCharge)}</label>
                        </div>
                        <div className='info'>
                            <label><span>Tabs : </span>{dineinTabs.TabServiceCharge = dineinTabs.TabServiceCharge ?? "0"}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <Piechart FoodBeverageSum={FoodBeverageSum} dineinTabs={dineinTabs} />

                    <div className='total-info'>
                        <label> <span>Food Sale : </span>{checkNan(dineinTabs.FoodSale)}</label>
                        <div>
                            <label><span>Beverage Sale : </span>{checkNan(dineinTabs.BeverageSale)}</label>
                        </div>
                        <div>
                            <label><span>Others : </span>{ !dineinTabs.OtherSale ? "0:00" : dineinTabs.OtherSale}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />

                </div>
                <div className='dine-tabs-paymemnt-status'>
                    <div>
                        <label><span>Credit Card : </span>{checkNan(paymentStatus.CreditCard)}</label>
                    </div>
                    <div>
                        <label><span>Cash : </span>{checkNan(paymentStatus.Cash)}</label>
                    </div>
                    <div>
                        <label><span> Mobile Payment : </span>{checkNan(paymentStatus.MobilePayment)}</label>
                    </div>
                    <div>
                        <label> <span>Credit Sale: </span>{checkNan(paymentStatus.Credit)}</label>
                    </div>
                    <div>
                        <label><span>Complimentary : </span>{checkNan(paymentStatus.Complimentary)}</label>
                    </div>
                    <div>
                        <label><span> Split : </span>{checkNan(paymentStatus.Split)}</label>
                    </div>
                    <div>
                        <label><span> Discount Amount : </span>{checkNan(dineinTabs.DiscountAmountSum)}</label>
                    </div>
                </div>
                <hr className="hr-line" />

                {/* </div>
            </div> */}
            </Sidebar>
        </div>
    )
}

export default SidebarPro