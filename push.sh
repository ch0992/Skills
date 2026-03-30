#!/bin/bash
gh auth switch --user ch0992
git push "$@"
gh auth switch --user yeonggyuchoi-usa
