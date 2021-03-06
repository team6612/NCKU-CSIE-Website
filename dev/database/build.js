const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const config = require( path.join( projectRoot, 'settings/database/config' ) );
const generateTables = require( path.join( projectRoot, 'dev/database/gen-tables' ) );

/**
 * Task `build:database`:
 *     Auto generate database table files.
 */

generateTables( 'faculty', config );
generateTables( 'announcement', config );
