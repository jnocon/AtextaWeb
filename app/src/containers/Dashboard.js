import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles';
import { FlatButton } from 'material-ui'

import Navbar from '../components/Navbar'
import MessageList from './MessageList'
import GroupList from './GroupList'
import AddGroupModal from './AddGroupModal'
import AddMessageModal from './AddMessageModal'
 
class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showAddGroupModal: false,
			showAddMessageModal: false
		}
		this.closeAddGroupModal=this.closeAddGroupModal.bind(this)
		this.toggleAddGroupModal=this.toggleAddGroupModal.bind(this)
		this.toggleAddMessageModal = this.toggleAddMessageModal.bind(this)
		this.closeAddMessageModal = this.closeAddMessageModal.bind(this)
	}

	closeAddGroupModal() {
		this.setState({showAddGroupModal: false})
	}

	toggleAddGroupModal() {
		this.setState({showAddGroupModal: !this.state.showAddGroupModal})
	}

	closeAddMessageModal() {
		this.setState({showAddMessageModal: false})
	}

	toggleAddMessageModal() {
		this.setState({showAddMessageModal: !this.state.showAddMessageModal})
	}

	render() {
		return (
			<div>
				<MuiThemeProvider>
					<div>
						<Navbar	/>
						<MessageList />
						<FlatButton label="show the add message modal" onClick={this.toggleAddMessageModal} />
						{this.state.showAddMessageModal ? <AddMessageModal /> : <div></div>}
						<GroupList />
						<FlatButton label="show the add group modal" onClick={this.toggleAddGroupModal} />
						{this.state.showAddGroupModal ? <AddGroupModal /> : <div></div>}
					</div>
				</MuiThemeProvider>
      </div>
		)
	}
}

export default Dashboard