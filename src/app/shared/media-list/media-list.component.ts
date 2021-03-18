import { Component, Input, OnInit } from '@angular/core';

import { IMediaFetch } from '../../modules/interfaces/media-fetch';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() mediaList!: IMediaFetch;
  @Input() itemLimit: number = 30;
  @Input() viewMode: number = 1;
  seasonPlural = { '=0': 'No seasons', '=1': '# season', 'other': '# seasons' };

  constructor() { }

  ngOnInit(): void {
  }

  trackMedia(index: number, item: any) {
    return item?._id || null;
  }

}
