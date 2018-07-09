const teacher = require( '../../../settings/database/connect' )( 'teacher' );
const tables = {
    teachers_profile: teacher.import( '../tables/teachers_profile' ),
};

module.exports = {
  getTeacherProfile: function(){
    return tables.teachers_profile.findAll();
  },
};
