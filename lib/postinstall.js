const { execSync } = require('child_process');
const pkg = require('../package.json');

function main() {
    const versionBuff = execSync(`npm view ${pkg.name} version`);
    const version = versionBuff.toString('utf8');

    console.warn(`[⚠️] ${pkg.name} is still in development, several updates are released regularly.`);
    
    if (!/^(\d+([a-z-]?)+.?)+/igm.test(version)) {
        return void 0;
    }
    
    if (version !== pkg.name) console.warn(`[⚠️] You have install ${pkg.name}${pkg.version} but the latest package version ${pkg.name}${version} is ready to install`);
    if (version !== pkg.name) console.warn(`[⚠️] If you have install this version for bug reason, please open an issue for help us to make ${pkg.name} better`);
    if (version !== pkg.name && pkg.repository.url) console.warn(`[⚠️] ${pkg.repository.url}`);

    return void 0;
};

main();