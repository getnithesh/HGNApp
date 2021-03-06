
import { inject } from '@ember/service';
import Service from '@ember/service';

export default Service.extend({
  dataService: inject('datastore-service'),

  getDashboardData(requestorId) {

    let relativePath = "/dashboard/" + requestorId;
    let data = null;
    let method = "get";
    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  getWeeklyEffort(requestor, startdate, enddate) {
    let relativePath = "/dashboard/weeklydata/" + `${requestor.requestorId}/${startdate}/${enddate}`;
    let data = null;
    let method = "get";
    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;

  },
  getLeaderBoard(requestor) {
    let relativePath = "/dashboard/leaderboard/" + requestor.requestorId;
    let data = null;
    let method = "get";
    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;

  },
  getMonthlyEffort(requestor, startdate, enddate) {
    let relativePath = "/dashboard/monthlydata/" + `${requestor.requestorId}/${startdate}/${enddate}`;
    let data = null;
    let method = "get";
    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;

  }


});
