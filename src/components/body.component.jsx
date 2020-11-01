import Header from './header.component';

const Body = props => (
    <>
    <Header/>
    {props.children}
    </>
)

export default Body;