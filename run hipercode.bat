@echo off
cd hipercode
:run
	node.exe hipercode.js
	pause
	cls
	call :run