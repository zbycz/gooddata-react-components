import * as React from 'react';
import { mount } from 'enzyme';
import { AttributeElements, IAttributeElementsProps, IAttributeElementsChildren } from '../AttributeElements';
import {
    createMetadataMock,
    ATTRIBUTE_DISPLAY_FORM_URI,
    ATTRIBUTE_DISPLAY_FORM_IDENTIFIER,
    ATTRIBUTE_DISPLAY_FORM_IDENTIFIER_2,
    COUNTRIES
} from './utils';
import { delay } from '../../../tests/utils';

describe('AttributeElements', () => {
    function renderComponent(props: IAttributeElementsProps) {
        const children = (params: IAttributeElementsChildren) => {
          return props.children(params);
        };
        return mount(
            <AttributeElements
                {...props}
                children={children}
            />
        );
    }

    it('should load attribute values by uri', () => {
        const metadata = createMetadataMock();
        const props = {
            projectId: '1',
            metadata,
            options: { limit: 1 },
            uri: ATTRIBUTE_DISPLAY_FORM_URI,
            children: jest.fn().mockReturnValue(<div />)
        };
        renderComponent(props as any); // because mocked metadata don't match

        expect(props.children).toHaveBeenCalledTimes(1);
        expect(props.children.mock.calls[0][0].isLoading).toBe(true);

        return delay().then(() => {
            expect(props.children).toHaveBeenCalledTimes(2);
            expect(metadata.getIdentifiersFromUris).toHaveBeenCalledTimes(1);
            expect(props.children.mock.calls[1][0].validElements).toEqual(
                {
                    items: [
                        { element: {
                            title: 'Afghanistan',
                            uri: '/gdc/md/projectId/object/foo?id=0'
                        }}
                    ],
                    paging: { count: 1, offset: 0, total: 198 }
                }
            );
            expect(props.children.mock.calls[1][0].isLoading).toBe(false);
            expect(props.children.mock.calls[1][0].error).toBe(null);
        });
    });

    it('should load attribute defined by identifier', () => {
        const metadata = createMetadataMock();
        const props = {
            projectId: '1',
            metadata,
            options: { limit: 1 },
            identifier: ATTRIBUTE_DISPLAY_FORM_IDENTIFIER,
            children: jest.fn().mockReturnValue(<div />)
        };
        renderComponent(props as any); // because mocked metadata don't match

        expect(props.children).toHaveBeenCalledTimes(1);
        expect(props.children.mock.calls[0][0].isLoading).toBe(true);

        return delay().then(() => {
            expect(metadata.getIdentifiersFromUris).toHaveBeenCalledTimes(0);
            expect(metadata.getValidElements).toHaveBeenCalledTimes(1);
            expect(props.children).toHaveBeenCalledTimes(2);
            expect(props.children.mock.calls[1][0].validElements).toEqual(
                {
                    items: [{ element: { title: 'Afghanistan', uri: '/gdc/md/projectId/object/foo?id=0' }} ],
                    paging: { count: 1, offset: 0, total: 198 }
                }
            );
            expect(props.children.mock.calls[1][0].isLoading).toBe(false);
            expect(props.children.mock.calls[1][0].error).toBe(null);
        });
    });

    it('should load all entries if no options.limit is defined', () => {
        const metadata = createMetadataMock();
        const props = {
            projectId: '1',
            metadata,
            identifier: ATTRIBUTE_DISPLAY_FORM_IDENTIFIER,
            children: jest.fn().mockReturnValue(<div />)
        };
        renderComponent(props as any); // because mocked metadata don't match

        return delay().then(() => {
            expect(metadata.getIdentifiersFromUris).toHaveBeenCalledTimes(0);
            expect(metadata.getValidElements).toHaveBeenCalledTimes(1);
            expect(props.children).toHaveBeenCalledTimes(2);
            expect(props.children.mock.calls[1][0].validElements.items.length).toEqual(COUNTRIES.length);
        });
    });

    it('should load more results with loadMore function', () => {
        const metadata = createMetadataMock();
        const props = {
            projectId: '1',
            metadata,
            options: { limit: 1 },
            identifier: ATTRIBUTE_DISPLAY_FORM_IDENTIFIER,
            children: jest.fn().mockReturnValue(<div />)
        };
        renderComponent(props as any); // because mocked metadata don't match

        return delay().then(() => {
            expect(props.children.mock.calls[1][0].validElements).toEqual(
                {
                    items: [{ element: { title: 'Afghanistan', uri: '/gdc/md/projectId/object/foo?id=0' }} ],
                    paging: { count: 1, offset: 0, total: 198 }
                }
            );
            props.children.mock.calls[1][0].loadMore();

            expect(props.children).toHaveBeenCalledTimes(3);
            expect(props.children.mock.calls[2][0].isLoading).toBe(true);

            return delay().then(() => {
                expect(props.children).toHaveBeenCalledTimes(4);
                expect(metadata.getValidElements).toHaveBeenCalledTimes(2);
                expect(props.children).toHaveBeenCalledTimes(4);
                expect(props.children.mock.calls[3][0].isLoading).toBe(false);
                expect(props.children.mock.calls[3][0].validElements).toEqual(
                    {
                        items: [
                            { element: { title: 'Afghanistan', uri: '/gdc/md/projectId/object/foo?id=0' }},
                            { element: { title: 'Albania', uri: '/gdc/md/projectId/object/foo?id=1' }}
                        ],
                        paging: { count: 2, offset: 0, total: 198 }
                    }
                );
            });
        });
    });

    it('should load another attribute on prop change', () => {
        const metadata = createMetadataMock();
        const props = {
            projectId: '1',
            metadata,
            options: { limit: 1 },
            identifier: ATTRIBUTE_DISPLAY_FORM_IDENTIFIER_2,
            children: jest.fn().mockReturnValue(<div />)
        };
        const wrapper = renderComponent(props as any); // because mocked metadata don't match

        return delay().then(() => {
            expect(props.children).toHaveBeenCalledTimes(2);
            expect(metadata.getIdentifiersFromUris).toHaveBeenCalledTimes(0);
            expect(metadata.getValidElements).toHaveBeenCalledTimes(1);
            expect(props.children.mock.calls[1][0].validElements).toEqual({
                items: [{element: {title: 'Abundant Ammunition', uri: '/gdc/md/projectId/object/baz?id=0'}}],
                paging: { count: 1, offset: 0, total: 167 }
            });
            expect(props.children.mock.calls[1][0].isLoading).toBe(false);
            wrapper.setProps({
                identifier: null,
                uri: ATTRIBUTE_DISPLAY_FORM_URI
            });
            expect(props.children).toHaveBeenCalledTimes(3);
            expect(props.children.mock.calls[2][0].isLoading).toBe(true);

            return delay().then(() => {
                expect(props.children).toHaveBeenCalledTimes(4);
                expect(metadata.getIdentifiersFromUris).toHaveBeenCalledTimes(1);
                expect(metadata.getValidElements).toHaveBeenCalledTimes(2);
                expect(props.children).toHaveBeenCalledTimes(4);
                expect(props.children.mock.calls[3][0].isLoading).toBe(false);
                expect(props.children.mock.calls[3][0].validElements).toEqual(
                    {
                        items: [{ element: { title: 'Afghanistan', uri: '/gdc/md/projectId/object/foo?id=0' }} ],
                        paging: { count: 1, offset: 0, total: 198 }
                    }
                );
            });
        });
    });
});
