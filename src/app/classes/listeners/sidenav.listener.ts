import { HostListener, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { Devices } from '../../constants/devices';

export class OnSidenavListener {
	private readonly smDevice = Devices.SM_DEVICE;

	private windowWidth: number;

	//Attribute a HTML element with the tag #sidenav to a variable.
	@ViewChild('sidenav') private sidenav: MdSidenav;

	//Listen to the dimensions of the window when it is loaded and resized.
	@HostListener('window:load', ['$event'])
	@HostListener('window:resize', ['$event'])
	public checkWindowsDimensions(event): void {
		this.windowWidth = (event.target.innerWidth === undefined) ? window.innerWidth : event.target.innerWidth;

		//Display sidenav depending on the size of the window.
		if(!!this.sidenav) {
			//On XS devices, hide the sidenav...
			if(this.windowWidth < this.smDevice) {
				this.sidenav.align = "start";
				this.sidenav.mode = "over";
				this.sidenav.opened = false;
			}
			//...otherwise, show the sidenav side-by-side with the content.
			else {
				this.sidenav.align = "start";
				this.sidenav.mode = "side";
				this.sidenav.opened = true;
			}
		}
	}

	/**
	 * Closes the sidenav if it is less than the specified width.
	 * @param deviceWidth The width of the device.
	 */
	private closeSidenav(deviceWidth): void {
		if(this.windowWidth < deviceWidth) {
			this.sidenav.close();
		}
	}
} 