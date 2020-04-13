/**
 * Map add-ins definition file. MyGeotab version: 5.7.2001
 */

export declare namespace geotab {
    /**
     * Service to request information stored in browser LocalStorage
     */
    interface ILocalStorageService {
        set (key: string, value: string): Promise<boolean>;
        remove (key: string): Promise<boolean>;
        get (key: string): Promise<string | undefined>;
    }

    /**
     * Current user session information
     * @param database Current database name
     * @param userName Current user name
     * @param sessionId Current user session id
     * @param domain Current domain name
     */
    interface ISessionInfo {
        database: string;
        userName: string;
        sessionId: string;
        domain: string;
    }

    /**
     * Tuple for calling server methods where first element is method name and second is an object with parameters.
     */
    type TApiCall = [string, object];

    /**
     * Service for requesting data from Geotab server
     */
    interface IApiService {
        call (key: string, value: object): Promise<object[]>;
        multiCall (calls: TApiCall[]): Promise<object[][]>;
        getSession (): Promise<ISessionInfo>;
    }

    /**
     * Group id object that is selected by user in company filter
     */
    interface IGroupFilterId {
        id: string;
    }

    /**
     * Service for getting/setting page state and moving between MyGeotab page
     */
    interface IPageService {
        active: boolean;
        set (key: string, value: string): Promise<boolean>;
        get (key: string): Promise<object>;
        go (page: string, state?: object): Promise<boolean>;
        hasAccessToPage (page: string): Promise<boolean>;
        getFilterState (): Promise<IGroupFilterId[]>;

        // events handlers
        attach (event: "focus", handler: () => void): void;
        attach (event: "blur", handler: () => void): void;
        attach (event: "stateChange", handler: (state: object) => void): void;
        attach (event: "filterChange", handler: (groups: IGroupFilterId[]) => void): void;

        detach (event: "focus" | "blur" | "stateChange" | "filterChange", handler?: Function): void;
    }

    interface ICoordinate {
        x: number;
        y: number;
    }

    /**
     * Trip object that is sent to add-in when user interacts with trip
     */
    interface ITripEventData {
        id: string;
        device: {
            id: string;
        };
        dateTime: string;
    }

    /**
     * Exception object that is sent to add-in when user interacts with exception icon on the map
     */
    interface IExceptionEventData {
        to: string;
        from: string;
        id: string;
        rule: { id: string };
        device: { id: string };
    }

    /**
     * Exceptions object that is sent to add-in when user interacts with exception icon on the map
     */
    interface IExceptionsEventData {
        exceptions: IExceptionEventData[];
    }

    /**
     * Device object that is sent to add-in when user interacts with device
     */
    interface IDeviceEventData {
        id: string;
    }

    /**
     * Zone object that is sent to add-in when user interacts with zone
     */
    interface IZoneEventData {
        id: string;
    }

    /**
     * Route object that is sent to add-in when user interacts with route
     */
    interface IRouteEventData {
        id: string;
    }

    /**
     * Event object that is sent to add-in when user interacts with zone
     */
    interface IZoneEvent {
        type: "zone";
        entity: IZoneEventData;
    }

    /**
     * Event object that is sent to add-in when user interacts with device
     */
    interface IDeviceEvent {
        type: "device";
        entity: IDeviceEventData;
    }

    /**
     * Event object that is sent to add-in when user interacts with route
     */
    interface IRouteEvent {
        type: "route";
        entity: IRouteEventData;
    }

    /**
     * Event object that is sent to add-in when user interacts with trip
     */
    interface ITripEvent {
        type: "trip";
        entity: ITripEventData;
    }

    /**
     * Event object that is sent to add-in when user interacts with device exceptions
     */
    interface IExceptionsEvent {
        type: "exceptions";
        entity: IExceptionsEventData;
    }

    /**
     * Event object that is sent to add-in when user interacts with different types of entitis on the map
     */
    type TEventData = IZoneEvent | IDeviceEvent | IRouteEvent | ITripEvent | IExceptionsEvent;

    /**
     * Service for catching events that happens when user interact with different entities on the map
     */
    interface IEventsService {
        attach (event: "move", handler: (e: ICoordinate) => void): void;
        attach (event: "over", handler: (e: TEventData) => void): void;
        attach (event: "out", handler: (e: TEventData) => void): void;
        attach (event: "click", handler: (e: TEventData) => void): void;

        detach (event: "move" | "over" | "out" | "click", handler?: Function): void;
    }

    /**
     * An object that represents longitude and latitude
     */
    interface IMapLatLng {
        lat: number;
        lng: number;
    }

    /**
     * Object that represents a map bounding box.
     */
    interface IMapBounds {
        sw: IMapLatLng;
        ne: IMapLatLng;
    }

    /**
     * Current map viewport
     */
    interface IChangedViewport {
        zoom: number;
        bounds: IMapBounds;
    }

    /**
     * Service for manipulating viewport of the map and getting updates about changed map viewport
     */
    interface IMapService {
        setBounds (bounds: IMapBounds): Promise<boolean>;
        getBounds (): Promise<IMapBounds>;
        setZoom (zoom: number): Promise<boolean>;
        getZoom (): Promise<number>;

        // events handlers
        attach (event: "change", handler: () => void): void;
        attach (event: "changed", handler: (e: IChangedViewport) => void): void;

        detach (event: "change" | "changed", handler?: Function): void;
    }

    interface ILocation {
        lat: number;
        lng: number;
    }

    type TPosition = ILocation | ICoordinate;

    /**
     * Custom tooltip image options. It can be either link to external image, base64 image or image stored in ArrayBuffer
     */
    interface ITooltipImage {
        url?: string;
        buffer?: ArrayBuffer;
        width: number;
        height: number;
    }

    /**
     * Custom map add-in tooltip options. It can be either a text information or an image
     */
    interface ITooltip {
        icon?: string;
        image?: ITooltipImage;
        main?: string;
        secondary?: string[];
        additional?: string[];
    }

    /**
     * Service for showing additional information in entities tooltip
     */
    interface ITooltipService {
        showAt(position: TPosition, pattern: ITooltip, sequence: number): void;
        show(pattern: ITooltip, sequence: number): void;
        hide(): void;
    }

    /**
     * Custom action button options
     */
    interface IMenuActionItem {
        title: string;
        icon?: string;
        url?: string;
        clickEvent?: string;
        zIndex?: number;
        data?: object;
    }

    type TMenuType = "zone" | "map" | "device" | "route" | "marker" | "trip";

    /**
     * Data that is passed to add-in when all types of map action menus are about to be shown
     */
    interface IMenuEventData {
        x: number;
        y: number;
        menuName: string;
        location: ILocation;
    }

    /**
     * Data that is passed to add-in when map action menu is about to be shown
     */
    interface IMapMenuEventData extends IMenuEventData {}

    /**
     * Data that is passed to add-in when zone action menu is about to be shown
     */
    interface IZoneMenuEventData extends IMenuEventData {
        zone: { id: string };
    }

    /**
     * Data that is passed to add-in when route action menu is about to be shown
     */
    interface IRouteMenuEventData extends IMenuEventData {
        route: { id: string };
    }

    /**
     * Data that is passed to add-in when location marker action menu is about to be shown
     */
    interface IMarkerMenuEventData extends IMenuEventData {
        title: string;
    }

    /**
     * Data that is passed to add-in when device action menu is about to be shown
     */
    interface IDeviceMenuEventData extends IMenuEventData {
        device: { id: string };
    }

    /**
     * Trip data that is passed to add-in when trip action menu is about to be shown
     */
    interface ITripData {
        start: string;
        stop: string;
    }

    /**
     * Data that is passed to add-in when trip action menu is about to be shown
     */
    interface ITripMenuEventData extends IMenuEventData {
        dateTime: string;
        device: { id: string };
        trip: ITripData;
    }

    /**
     * Service for showing a custom action list instead of the existing one, or adding custom buttons to existing action lists.
     */
    interface IActionListService {
        show (position: TPosition, title: string, items: IMenuActionItem[]): void;

        attachMenu (menuName: "zone", handler: (menuName: string, data: IZoneMenuEventData) => IMenuActionItem[] | Promise<IMenuActionItem[]>): void;
        attachMenu (menuName: "map", handler: (menuName: string, data: IMapMenuEventData) => IMenuActionItem[] | Promise<IMenuActionItem[]>): void;
        attachMenu (menuName: "device", handler: (menuName: string, data: IDeviceMenuEventData) => IMenuActionItem[] | Promise<IMenuActionItem[]>): void;
        attachMenu (menuName: "route", handler: (menuName: string, data: IRouteMenuEventData) => IMenuActionItem[] | Promise<IMenuActionItem[]>): void;
        attachMenu (menuName: "marker", handler: (menuName: string, data: IMarkerMenuEventData) => IMenuActionItem[] | Promise<IMenuActionItem[]>): void;
        attachMenu (menuName: "trip", handler: (menuName: string, data: ITripMenuEventData) => IMenuActionItem[] | Promise<IMenuActionItem[]>): void;

        detachMenu (menuName: TMenuType, handler?: Function): void;

        // events handlers
        attach (customEventName: string, handler: (customEventObject: object) => void): void;
        detach (customEventName: string, handler?: (customEventObject: object) => void): void;
    }

    /**
     * Location or coordinate of the next point
     */
    type TPathSegPoint = ILocation | ICoordinate | number;

    /**
     * Segment of the path element that will be added in `d` attribute
     */
    interface IPathSeg {
        type: string;
        points?: TPathSegPoint[];
    }

    /**
     * Supported custom map element event types
     */
    type TCanvasElementEvent = "click" | "over" | "out";

    /**
     * Style properties that can be changed for every custom element
     * @prop fill Background color of the element
     * @prop stroke Border color of the element
     * @prop stroke-width Border width of the element
     * @prop fill-opacity Opacity of the element
     * @prop font-size Text element font size
     * @prop font-weight Text element font weight
     */
    interface IFrameCanvasElementStyleAttributes {
        fill?: string;
        stroke?: string;
        "stroke-width"?: number;
        "fill-opacity"?: number;
        "font-size"?: number;
        "font-weight"?: number;
    }

    interface IFrameCanvasRectAttributes extends IFrameCanvasElementStyleAttributes {
        height?: number;
        width?: number;
        rx?: number;
        ry?: number;
        coords?: TPosition;
    }

    interface IFrameCanvasTextAttributes extends IFrameCanvasElementStyleAttributes{
        dx?: number;
        dy?: number;
        text?: string;
        coords?: TPosition;
    }

    interface IFrameCanvasCircleAttributes extends IFrameCanvasElementStyleAttributes{
        r?: number;
        coords?: TPosition;
    }

    interface IFrameCanvasPathAttributes extends IFrameCanvasElementStyleAttributes{
        path?: IPathSeg[];
    }

    interface IFrameCanvasMarkerAttributes extends IFrameCanvasElementStyleAttributes{
        height?: number;
        width?: number;
        x?: number;
        y?: number;
        dx?: number;
        dy?: number;
        coords?: TPosition;
        href?: string;
        buffer?: ArrayBuffer;
    }

    type IFrameCanvasElementAttributes = IFrameCanvasRectAttributes | IFrameCanvasTextAttributes | IFrameCanvasCircleAttributes | IFrameCanvasPathAttributes | IFrameCanvasMarkerAttributes;

    /**
     * New map element object
     * @method change Changes style attributes of the current map element
     * @method remove Removes current map element
     * @method isRemoved Returns true if element was removed
     * @method attach Attaches event handler to current element event
     * @method detach Detaches event handler from current element event
     */
    interface ICanvasElement {
        change (attrs: IFrameCanvasElementAttributes): ICanvasElement;
        remove (): void;
        isRemoved (): boolean;
        attach (event: TCanvasElementEvent, handler: (data: ICoordinate) => void): ICanvasElement;
        detach (event: TCanvasElementEvent, handler?: (data: ICoordinate) => void): ICanvasElement;
    }

    interface ICanvasService {
        path (coordinates: IPathSeg[], zIndex: number): ICanvasElement;
        rect (coords: TPosition, width: number, height: number, radius: number, zIndex: number): ICanvasElement;
        circle (coords: TPosition, radius: number, zIndex: number): ICanvasElement;
        marker (coords: TPosition, width: number, height: number, imgData: string | ArrayBuffer, zIndex: number): ICanvasElement;
        text (coords: TPosition, text: string, zIndex: number): ICanvasElement;
        clear (): void;
    }

    interface IAddinServices {
        localStorage: ILocalStorageService;
        api: IApiService;
        page: IPageService;
        events: IEventsService;
        map: IMapService;
        tooltip: ITooltipService;
        actionList: IActionListService;
        canvas: ICanvasService;
    }

    type AddinMainFn = (elt: HTMLElement, services: IAddinServices) => void;

    export let addin: { [addinName: string]: AddinMainFn };
}

declare module 'geotab' {
    export = geotab;
}