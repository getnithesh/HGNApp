import Ember from 'ember';

export default Ember.Component.extend({
    newactionitem: {},
    addnewactionitem: false,
    dataService: Ember.inject.service('datastore-service'),
    userProfileService: Ember.inject.service('user-profile-service'),

    forUser: "",
    newAIdescription: "",
    newdescription: "",

    init() {

        this._super(...arguments);

        let user = this.get('loggedinUser');


        this.get('userProfileService').getTeamMembers(user)
            .then(results => { this.set('teamMembers', results); });

        this.get('dataService').getActionItems(user)
            .then(results => { this.set('actionItems', results); });
    },




    actions: {

        getActionItemsForUser() {

            let requestor = { "requestorId": this.get('forUser') };
            this.get('dataService').getActionItems(requestor)
                .then(results => {
                    this.set('actionItems', results);
                });
        },

        editActionItem(actionItem) {
            let editedactionitem = {};

            editedactionitem._id = actionItem._id;
            editedactionitem.description = this.get('newdescription');
            editedactionitem.assignedTo = actionItem.assignedTo;
            editedactionitem.createdBy = actionItem.createdBy;


            this.get('dataService').editActionItem(editedactionitem);


        },
        deleteActionItem(actionItem) {



            this.get('actionItems').removeObject(actionItem);
            this.get('dataService').deleteActionItem(actionItem);

        },

        createActionItem() {
            let newActionItem = {};

            let assignedTo = this.get('forUser');

            if (!assignedTo) {
                assignedTo = this.get('loggedinUser.requestorId');
            }

            newActionItem.assignedTo = assignedTo;
            newActionItem.description = this.get('newAIdescription');

            this.get('dataService').createActionItem(newActionItem)
                .then(result => {
                    this.get('actionItems').addObject(result);
                    this.set('newAIdescription', "");
                });

        },
        showForm() {
            this.set('addnewactionitem', true);
        },
        selectAssignee(assignee) {
            this.set('newactionitem.assignedTo', assignee._id);

        }

    }

});