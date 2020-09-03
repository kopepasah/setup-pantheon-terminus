/**
 * Pantheon Terminus Setup
 *
 * @package setupPantheonTerminus
 */

// External Dependencies
const core = require( '@actions/core' );
const exec = require( '@actions/exec' );

async function run() {
	try {
		const PANTHEON_MACHINE_TOKEN = core.getInput( 'pantheon-machine-token' );
		await exec.exec( 'sudo mkdir -p ~/terminus' );
		await exec.exec( 'curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar' );
		await exec.exec( 'sudo php installer.phar install --install-dir=~/terminus' ); // Sudo is required in order to install bin/terminus.
		await exec.exec( 'terminus', [ 'auth:login', `--machine-token=${ PANTHEON_MACHINE_TOKEN }` ] );
	} catch ( error ) {
		core.setFailed( error.message );
	}
}

run()
