const path = require( 'path' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const opRoot = path.join( projectRoot, 'models/announcement/operation/' );
const getAllAnnouncements = require( path.join( opRoot, 'get-all-announcements' ) );
const getAnnouncementsByTags = require( path.join( opRoot, 'get-announcements-by-tags' ) );
const getAllPinnedAnnouncements = require( path.join( opRoot, 'get-all-pinned-announcements' ) );
const getPinnedAnnouncementsByTags = require( path.join( opRoot, 'get-pinned-announcements-by-tags' ) );
const getAllPages = require( path.join( opRoot, 'get-all-pages' ) );
const getPagesByTags = require( path.join( opRoot, 'get-pages-by-tags' ) );
const getAnnouncement = require( path.join( opRoot, 'get-announcement' ) );

const postAnnouncement = require( path.resolve( opRoot, 'post-announcement' ) );
const postAnnouncementTags = require( path.resolve( opRoot, 'post-announcementTags' ) );
const postAnnouncementFile = require( path.resolve( opRoot, 'post-announcementFile' ) );

const patchAnnouncement = require( path.resolve( opRoot, 'patch-announcement' ) );

const deleteAnnouncement = require( path.resolve( opRoot, 'delete-announcements' ) );
const deleteAnnouncementTags = require( path.resolve( opRoot, 'delete-announcementTags' ) );
const deleteAnnouncementFiles = require( path.resolve( opRoot, 'delete-announcementFiles' ) );

apis.use( bodyParser.json() );

apis.get( /^\/all-announcement$/, async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getAllAnnouncements( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
        page:      req.query.page,
        language:  req.query.language,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( /^\/all-pages$/, async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getAllPages( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.pageNumber )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( /^\/all-pinned$/, async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getAllPinnedAnnouncements( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
        language:  req.query.language,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( /^\/tags-announcement$/, async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getAnnouncementsByTags( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
        page:      req.query.page,
        language:  req.query.language,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( /^\/tags-pages$/, async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getPagesByTags( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.pageNumber )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( /^\/tags-pinned$/, async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getPinnedAnnouncementsByTags( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
        language:  req.query.language,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( /^\/(\d+)$/, async ( req, res ) => {
    const result = await getAnnouncement( {
        announcementId: req.params[ 0 ],
        language:       req.query.language,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.post( '/', async ( req, res ) => {
    const result = await postAnnouncement( {
        announcementData: req.body,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.patch( '/:id', async ( req, res ) => {
    const result = await patchAnnouncement( {
        announcementId:   req.params.id,
        announcementData: req.body,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.affectedRowCount )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.delete( '/:id', async ( req, res ) => {
    const result = await deleteAnnouncement( {
        announcementId: req.params.id,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.affectedRowCount )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

// TODO: Not yet finished
apis.post( '/:id/file', async ( req, res ) => {
    const result = await postAnnouncementFile( {
        announcementFileData: req.body,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

// TODO: Not yet finished
apis.delete( '/:id/file/:id', async ( req, res ) => {
    const result = await deleteAnnouncementFiles( {
        announcementFileData: req.body,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.post( '/:id/tags', async ( req, res ) => {
    const tagId = req.query.tagId.split( ',' ).map( s => Number.parseInt( s, 10 ) );
    const result = await postAnnouncementTags( {
        announcementId: req.params.id,
        tagId,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.delete( '/:id/tags', async ( req, res ) => {
    const tagId = req.query.tagId.split( ',' ).map( s => Number.parseInt( s, 10 ) );
    const result = await deleteAnnouncementTags( {
        announcementId: req.params.id,
        tagId,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.affectedRowCount )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

module.exports = apis;
