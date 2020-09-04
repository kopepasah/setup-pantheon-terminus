/**
 * Pantheon Terminus Setup
 *
 * @package setupPantheonTerminus
 */

// External Dependencies
const core = require('@actions/core');
const child_process = require('child_process');
const fs = require('fs');

try {
	const home = process.env['HOME'];
	const homeTerminus = home + '/terminus';

	const PANTHEON_MACHINE_TOKEN = core.getInput('pantheon-machine-token');

	if (!PANTHEON_MACHINE_TOKEN) {
		core.setFailed("The pantheon-machine-token argument is missing.");
		return;
	}

	fs.mkdirSync(homeTerminus, { recursive: true });

	console.log('Downloading Terminus');
	child_process.exec( 'curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar' );
	console.log('Installing Terminus');
	var install = child_process.exec( 'sudo php installer.phar install --install-dir=~/terminus' );

	install.stdout.pipe(process.stdout);
	install.on('exit', function() {
		console.log('Authenticating Terminus');
		child_process.exec( 'terminus', [ 'auth:login', `--machine-token=${PANTHEON_MACHINE_TOKEN}` ] );
	})

} catch ( error ) {
	core.setFailed( error.message );
}
