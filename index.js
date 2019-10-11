/**
 * Pantheon Terminus Setup
 *
 * @package setupPantheonTerminus
 */

// External Dependencies
const core = require( '@actions/core' );
const exec = require( '@actions/exec' );

try {
	const PANTHEON_MACHINE_TOKEN = core.getInput( 'pantheon-machine-token' );

	await exec.exec( 'curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar' );
	await exec.exec( 'sudo php installer.phar install' ); // Sudo is required in order to install bin/terminus.
	await exec.exec( 'terminus', [ 'auth:login', `--machine-token=${ PANTHEON_MACHINE_TOKEN }` ] );
} catch ( error ) {
	core.setFailed( error.message );
}
