# Merge queue demo a

Deliberately trivial content. This file exists only so that there is a change to
put through the merge queue alongside its sibling, demonstrating that two
approved pull requests carrying `v:patch` no longer collide on a version
number.

Under the previous model both this pull request and its sibling would have had
`package.json` set to the same next version by the bot. Whichever merged second
would have failed `check-version`, needed another bump, lost its approval and
been evicted from the queue.

Under merge queue versioning neither pull request contains a version at all.
Each carries only the `v:patch` label, and the number is applied once on main
after merge.

Safe to delete once the canary has been observed.
