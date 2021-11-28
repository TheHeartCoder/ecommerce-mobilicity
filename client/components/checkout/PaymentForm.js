const PaymentForm = () => {
	return (
		<div className='row'>
			<div className='col-md-6'>
				<div className='card p-4 m-2'>
					<div>
						{' '}
						<h5 className='text-info'>Total price : $2563 </h5>
						<h5 className='text-info'>Amount Payable : $2563</h5>
						<span style={{ fontSize: '10px', color: '#294f8c' }}>
							<u>PXYT12</u> applied
						</span>
					</div>
					<hr />
					<input
						type='text'
						className='form-control mb-2'
						placeholder='Apply Coupon Code here'
					/>
					<button className='btn btn-block btn-info'>Apply</button>
					<hr />
					<ul>
						<li>
							<u>MB242</u> - 20% Discount
						</li>
						<li>
							<u>XP445</u> - 30% Discount (Min total amount: Rs. 2500/-)
						</li>
						<li>
							<u>PO785</u> - Flat 325/- Discount
						</li>
						<li>
							<u>WD145</u> - Flat 500/- Discount
						</li>
					</ul>
				</div>
			</div>
			<div className='col-md-6'>
				<div className='card p-4 m-2'>
					<div className='row'>
						<div className='col'>
							<input
								type='text'
								className='form-control text-center m-2'
								placeholder='Arindam Paul'
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<input
								type='text'
								className='form-control text-center m-2'
								placeholder='9965 2305 1546 8851'
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<input
								type='text'
								className='form-control text-center m-2'
								placeholder='11/26'
							/>
						</div>
						<div className='col'>
							<input
								type='text'
								className='form-control text-center m-2'
								placeholder='896'
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<button className='btn btn-primary btn-block m-2'>Pay</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentForm;
