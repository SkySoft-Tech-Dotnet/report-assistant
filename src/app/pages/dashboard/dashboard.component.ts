import { Component, OnInit } from '@angular/core';
import { WindowsService } from 'src/app/services/windows.service';
import { WindowOpenParameters } from 'src/electron/windows/windows.model';

@Component({
  selector: 'rp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	constructor(private windowsService: WindowsService) { }

	ngOnInit() {

	}

	openNewWindow() {
		const openParameters: WindowOpenParameters = {
            state: {
                width: 800,
                height: 600,
                show: true
            },
            url: '',
            serve: true,
            devTools: true
        };

		this.windowsService.openNewWindow(openParameters);
	}

}
