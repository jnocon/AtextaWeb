import React from 'react'
import axios from 'axios'
import { RaisedButton } from 'material-ui'
import { connect } from 'react-redux'
import { getUserCommands } from '../actions/atexta_actions'
import AddMessageModal from './AddMessageModal'


class MessageList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showAddMessageModal: false
		}	
		
		this.renderCommands = this.renderCommands.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
		this.openAddMessageModal = this.openAddMessageModal.bind(this)
		this.closeAddMessageModal = this.closeAddMessageModal.bind(this)
	}

	componentDidMount() {
		let userId = this.props.userId
		this.props.getUserCommands(userId)
	}

	closeAddMessageModal() {
		this.setState({showAddMessageModal: false})
	}

	openAddMessageModal() {
		this.setState({showAddMessageModal: true})
	}

	renderCommands(commands) {
		function renderCommand(command) {
			return(
				<tr key={command.commandName}>
		      <td contentEditable>{command.commandName}</td>
		      <td contentEditable>{command.text}</td>
		      <td>
			      	{command.groupName}
		      </td>
		 	 	</tr>	
		 	 	)
		}
		return commands.map(renderCommand)
	}
	render() {

		return (
			<div>
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Trigger</th>
							<th>Text</th>
							<th>Group</th>
						</tr>
					</thead>
					<tbody>
						{this.renderCommands(this.props.userCommands)}
						<tr>
							<RaisedButton type="button" label="add a new one" secondary={true} 
							onClick={this.openAddMessageModal} />
						</tr>
					</tbody>
				</table>
				{this.state.showAddMessageModal ? <AddMessageModal close={this.closeAddMessageModal}
				 show={this.state.showAddMessageModal} /> : <div></div>}
			</div>
		)
	}
}

function mapStateToProps({ atexta }) {
	return { userId: atexta.userId, userCommands: atexta.userCommands };
}

export default connect(mapStateToProps, {getUserCommands})(MessageList)