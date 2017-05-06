import React from 'react';
import { Nav,Pagination, li, PaginationLink } from 'reactstrap';


import './PictureShow.css';
export default class PictureShow extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			index : 1
		};

		this.changePicture = this.changePicture.bind(this);
	}

	render(){
		return (
			<div className = "text-center">
				<div className="picshow">
					<img src={`img/w-${this.props.group}.png`}/>
				</div>
				<ul className ="pagination">
			        <li>
			          	<PaginationLink previous href="#" />
			        </li>
			        <li>
			          	<PaginationLink  href="#" onClick={this.changePicture(1)}>
			           		 1
			          	</PaginationLink>
			        </li>
			        <li>
			         	 <PaginationLink  href="#">
			          		  2
			         	 </PaginationLink>
			        </li>
			        <li>
			          	<PaginationLink  href="#">
			           		 3
			          	</PaginationLink>
			        </li>
			        <li>
			          	<PaginationLink  href="#">
			           		 4
			          	</PaginationLink>
			        </li>
			        <li>
			          	<PaginationLink  href="#">
			           		 5
			          	</PaginationLink>
			        </li>
			        <li>
			          	<PaginationLink next href="#" />
			        </li>
			    </ul>
			</div>
		);
	}

	changePicture(e){

		
	}
}