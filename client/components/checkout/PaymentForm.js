const PaymentForm = () => {
	return (
		<div className='col-md-6 offset-md-3 card p-4'>
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
	);
};

export default PaymentForm;
