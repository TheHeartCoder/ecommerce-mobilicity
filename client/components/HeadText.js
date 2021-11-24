const HeadText = ({ headText, subText }) => {
  return (
    <h1 className='text-center jumbotron'>
      {headText} <br /> <p className='subHead'>{subText}</p>
    </h1>
  );
};

export default HeadText;
