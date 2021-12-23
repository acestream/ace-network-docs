# Running the Engine on the Desktop

On the desktop the engine can be started in two modes:

- GUI
- console

In the GUI mode the engine shows an icon in system's notification area while running.

In the console mode the engine shows no GUI elements.


## Windows

The engine location can be found from the registry:
```
HKCU\Software\ACEStream\InstallDir
```

The default engine location is:

```
%APPDATA%\ACEStream\engine\
```

Running the engine in GUI mode:
```
\path\to\engine\ace_engine.exe
```

Running the engine in console mode:
```
\path\to\engine\ace_console.exe --client-console
```


## Linux

The engine for Linux is distributed as a compressed folder.
There is no default location, it can be installed anywhere.

Running the engine in GUI mode:
```bash
/path/to/engine/start-engine --client-gtk
```

Running the engine in console mode:
```bash
/path/to/engine/start-engine --client-console
```

Actual engine executable is `acestreamengine`, but it's better to use
shell script `start-engine` to run the engine. This script sets `LD_LIBRARY_PATH`
environment variable and then runs `acestreamengine`. It helps avoiding binary
conflicts.