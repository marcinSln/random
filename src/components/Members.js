import List from './List';
import React, { Component } from 'react';
import Firebase from 'firebase';
import config from '../config';

export default class Members extends Component {

    constructor(props){
        if (!Firebase.apps.length) {
            Firebase.initializeApp(config);
        }
       
        super(props);

        this.state = {
            selectedMembers: [],
            members:"",
            editMember:"",
            canManage: window.location.pathname === '/manage' ? true : false,
            teams:{
                A:[{"power":0}],
                B:[{"power":0}]
            }
        };
    }

    componentDidMount(){
        let ref = Firebase.database().ref('/');
        ref.on('value', (snapshot) => {
            let members = snapshot.val();
            this.setState(members);
        });
    }

    handleKeyDown = (e) =>  {
        let name = e.target.getAttribute('name')
        let lastChar = e.nativeEvent.data;

        let member = Object.keys(this.state.members).filter( item => {
            return item === name;
        });

        if(!(/^(?:[1-9]|0[1-9]|10)$/).test(e.target.value)){
            e.target.value = lastChar;
        }

        let members = {...this.state.members};
        members[member["0"]].overall = e.target.value ;
        this.setState(members);
    }


    edit = (e) => {
        if(e.target.tagName === "LI"){

            let editItem = Object.values(this.state.members).filter( (item) => {
                return item.name === e.target.getAttribute("data-name");
            });
    
            this.setState({
                editMember:editItem
            });

            let selectedItem = document.querySelectorAll('.list__item--selected');
            if(selectedItem){
                selectedItem.forEach( item => {
                    item.classList.remove('list__item--selected')
                })
            }

            if(e.target.classList.contains("list__item--selected")){
                e.target.classList.remove("list__item--selected");
            }else{
                e.target.classList.add("list__item--selected");
            }
        }
    }

    confirmEdit = (item) => {
        let id = item.getAttribute('data-id');
        Firebase.database().ref(`/members/${id}`).update({
            overall:parseInt(this.state.editMember['0'].overall),
        }).then( e => {
            this.setState({
                editMember: ""
            });
        });
        
    }

    handleDelete = e => {
        console.log("e",e.target);
        let id = e.target.getAttribute('data-id');
        let confirm = window.confirm("Czy na pewno chcesz usunąć zawodnika?");
        if(confirm){
          Firebase.database().ref(`/members/${id}`).remove();
        }
        
    }

    select = (e) => {
        let {selectedMembers} = this.state;
        let clickedItem = e.target.querySelector('.member__name').innerHTML;
        let overall = e.target.getAttribute("data-overall");
        let selectedMember = {'name': clickedItem, 'overall': overall };
        let isExist = selectedMembers.find(member => member['name'] === selectedMember.name);


            if( isExist ) {
                let updatedMembers = selectedMembers.filter(member => { 
                    return member.name !== clickedItem;
                });
                this.setState({
                    selectedMembers:updatedMembers
                });
            }else{
                let selectedMember = {'name': clickedItem, 'overall': overall };
                this.setState({
                    selectedMembers: [...selectedMembers, selectedMember]
                });
            }

        if(e.target.classList.contains("list__item--selected")){
            e.target.classList.remove("list__item--selected");
        }else{
            e.target.classList.add("list__item--selected");
        }
        
    }

    random() {
        let {selectedMembers,teams} = this.state;
        let summary = 0;
        let current = teams;
        let randArray = Array.from(Array(selectedMembers.length).keys())
        let alphabet = "AB";
        let index = alphabet[Math.floor(Math.random() * alphabet.length)]
        let oppositeIndex = index === 'B' ? "A" : 'B';
       
        
        current['A'] = [{"power":0}];
        current['B'] = [{"power":0}];
       
        selectedMembers.sort( (a,b) =>  parseInt(b.overall - parseInt(a.overall))).forEach(  (member,i) => {
        let rand = Math.floor((Math.random() * randArray.length),1 );
        let pos = randArray[rand];
        summary = Number(summary) + Number(member.overall);
     
    
        randArray.splice(rand, 1);

        if(teams[index].length >= teams[oppositeIndex].length ){
            current[oppositeIndex].push(selectedMembers[pos]);
            teams[oppositeIndex]['0'].power = teams[oppositeIndex]['0'].power + Number(selectedMembers[pos].overall);
        }else{
            current[index].push(selectedMembers[pos]);
            teams[index]['0'].power = teams[index]['0'].power + Number(selectedMembers[pos].overall);
        }
        
        });
        this.setState({teams:current });
    }

    render(props) {
        const {selectedMembers,teams} = this.state;
        return (
            <>
                <div className="column">
                    <div className="row">              
                        <div className={`block block--small-top ${this.props.isWider ? 'block--wider' : ''}`} >
                            <h2 className='text text--header-with-border'> Dostępni zawodnicy: </h2>
                            <List members={this.state.members} 
                                editableMember={this.state.editMember} 
                                classStyle="list__item--hover "
                                onInput={e => this.handleKeyDown(e)} 
                                handleDelete={this.handleDelete}
                                onClick={ this.state.canManage ? this.edit : this.select}
                                confirmEdit={e => this.confirmEdit(e.target)}
                            />
                        </div>   
                        
                        {teams['A'][1] && teams['B'][1] ? (
                            <div className="row no-margin">
                                {teams['A'][1] ?
                                    <div className="block  block--small-top">
                                        <h2 className='text text--header-with-border'> Drużyna A: </h2>
                                        <List classStyle="list__item list__item--home" members={teams['A']} />
                                        <br/>
                                        <span className='text text--white'>Siła: </span> 
                                        <small className="text text--big text--white"> {teams['A'][0].power} </small>
                                    </div> 
                                : "" }

                                {teams['B'][1] ?
                                    <div className="block  block--small-top">
                                        <h2 className='text text--header-with-border'>Drużyna B: </h2>
                                        <List classStyle="list__item list__item--away" members={teams['B']}  />
                                        <br/>
                                        <span className='text text--white'>Siła: </span> 
                                        <small className="text text--big text--white"> {teams['B'][0].power} </small>
                                    </div> 
                                : "" } 
                            </div>
                            ) : ''
                        }
                    </div>
                    {this.state.canManage  ?  " " : selectedMembers.length ?
                        <div className="btn btn--small  btn btn--base btn--end btn--fixed" onClick={() => this.random()}>
                            Losuj 
                        </div> : ""
                    }
                </div>
            </>
        )
    }
}
