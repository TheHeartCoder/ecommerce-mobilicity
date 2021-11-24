import HeadText from '../../components/HeadText';

const MyProfile = () => {
	return (
		<>
			<HeadText
				headText='Profile Details'
				subText='Your details are showing below'
			/>
			<div className='col-md-4 offset-md-4'>
				<div className='card'>
					<div className='card-body'>
						<h5 className='text-info text-center'>Arindam Paul</h5>
						<h5 className='text-info text-center'>parindam1@gmail.com</h5>
						<input
							type='text'
							className='form-control p-2 mb-4 mt-4'
							placeholder='Your Current Password'
						/>
						<input
							type='text'
							className='form-control p-2 mb-4'
							placeholder='Your New Password'
						/>
						<button type='button' className='btn btn-secondary float-right'>
							Change Password
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyProfile;
