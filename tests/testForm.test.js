import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import FormComponent from '~/components/SimpleConfigurator/StageOne/StageOne.vue';

describe('FormComponent', () => {
  it('renders correctly', () => {
	const goToStage = vi.fn();
    const wrapper = mount(FormComponent, {
      props: {
        stages: ["Anforderungen", "Aussenstation", "Innenstation", "Zubehör", "Übersicht"]
      },
	  global: {
		provide: {
		  goToStage
		}
	  }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes with default values', () => {
	const goToStage = vi.fn();
    const wrapper = mount(FormComponent, {
      props: {
        stages: ["Anforderungen", "Aussenstation", "Innenstation", "Zubehör", "Übersicht"]
      },
	  global: {
		provide: {
		  goToStage
		}
	  }
    });

    expect(wrapper.vm.numberIndoorStation).toBe(1);
    expect(wrapper.vm.numberOutdoorStation).toBe(1);
    expect(wrapper.vm.wiringCount).toBe(2);
  });



  it('updates filter correctly in setFilter', () => {
	const goToStage = vi.fn();
    const wrapper = mount(FormComponent, {
      props: {
        stages: ["Anforderungen", "Aussenstation", "Innenstation", "Zubehör", "Übersicht"]
      },
	  global: {
		provide: {
		  goToStage
		}
	  }
    });

    wrapper.vm.funktion = 'Video';
    wrapper.vm.technologie = 'Video-6-Draht';
    wrapper.vm.numberIndoorStation = 25;
    wrapper.vm.setFilter();

    expect(wrapper.vm.filter.funktion).toBe('Video');
    expect(wrapper.vm.filter.technologie).toBe('TCS:BUS');
  });
});