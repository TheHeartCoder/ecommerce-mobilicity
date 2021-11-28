import QRCode from 'react-qr-code';
const Invoice = () => {
	return (
		<div className='container'>
			<div className='card p-4 mt-4 ml-4 mr-4'>
				<div className='row'>
					<div className='col-md-8'>
						{' '}
						<p>Name : Arindam Paul </p>
						<p>
							Address: AC166, Prafuka Kanan, Keshtopur, Kolkata, West Bengal -
							700101
						</p>
						<p>Phone No : 7001722370</p>
						<p>
							Order ID : <strong>123456</strong>
						</p>
					</div>
					<div className='col-md-4'>
						<div className='text-right'>
							<QRCode value='I am here' size='120' />
						</div>
					</div>
				</div>
			</div>
			<div className='card p-4 mt-2 mb-4 ml-4 mr-4'>
				<table className='table col-md-10 offset-md-1'>
					<thead>
						<tr>
							<th>Item</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Smasung Mobile 01</td>
							<td>01</td>
							<td>$250</td>
						</tr>
						<tr>
							<td>Smasung Mobile 01</td>
							<td>01</td>
							<td>$250</td>
						</tr>
						<tr>
							<td>Smasung Mobile 01</td>
							<td>01</td>
							<td>$250</td>
						</tr>
						<tr>
							<td colspan='2' className='text-right'>
								<strong>Total Price</strong>
							</td>
							<td className='text-info'>
								<strong>$2500</strong>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='row'>
				<div className='col'>
					<h5 className='text-primary text-right mr-4'>Mobilicity</h5>
					<p
						className='text-dark text-right mr-4'
						style={{ marginTop: '-14px' }}
					>
						The Heart Coder
					</p>
				</div>
			</div>
			<div className='col-md-2 offset-md-5'>
				<button
					className='btn btn-primary btn-block hide-print'
					onClick={() => window.print()}
				>
					View Invoice
				</button>
			</div>
		</div>
	);
};

export default Invoice;
