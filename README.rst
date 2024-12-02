Advantech WISE Studio
=====================

*(Not Advantech Official Repo)*

Advantech offers a diverse product line under the WISE Series brand, including the WISE-2200-M, WISE-2410, WISE-4610, and WISE-4671, among others. These products are designed for various industrial IoT applications, such as environmental monitoring, equipment condition monitoring, and remote data collection. Each product offers specific capabilities tailored to meet the needs of industrial automation and smart factory environments.

If a specific component of the WISE Series requires setup via the USB port, users need to install WISE Studio software on Windows. To facilitate cross-platform compatibility, this repository provides a solution for users to install WISE Studio on macOS. After running WISE Studio, it will function as a web server, enabling users to access the configuration webpage for specific WISE products.

Installation & Activate Project
-------------------------------

Pyenv & Pipenv
~~~~~~~~~~~~~~

On macOS
^^^^^^^^

1. **Install USB Driver**
   Please install the CP210X USB Driver to enable your Mac to recognize the WISE Series via the USB port. This driver is required for all WISE Series models listed below.

   Driver: `CP210X USB Driver <https://www.silabs.com/developer-tools/usb-to-uart-bridge-vcp-drivers?tab=overview>`_

2. **Install pyenv & pipenv**

   Refer to the official documentation to install `pyenv <https://github.com/pyenv/pyenv>`_ and `pipenv <https://pipenv.pypa.io/en/latest/>`_.

3. **Spawn a subshell and activate the virtual environment**

   In the root of the repository, input the following command to activate the pipenv environment:

   .. code-block:: shell

       pipenv shell

Quick Start
-----------

Please execute the following shell command to launch WISE Studio:

.. code-block:: shell

    pipenv run python src/webServer.py --model WISE-2410 --serial_port /dev/tty.SLAB_USBtoUART --net_port 8083

This command requires additional arguments to enable WISE Studio to identify the specific WISE Series it needs to connect to and determine the appropriate UART port for communication. Additionally, note that WISE Studio is a web server, so the specified port is used for network communication.

Supported WISE Series
---------------------

- WISE-2410
- WISE-4210
- WISE-4471
- WISE-4610
- WISE-4671
- WISE-2200-M
