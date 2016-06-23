module PathHelpers

  module_function

  def search_path(community, user, locale_param, opts = {})
    o = opts.dup.to_hash
    o.delete("controller")
    o.delete("action")
    o.delete("locale")

    non_default_locale = ->(locale) { locale.present? && locale != community.default_locale.to_s}
    not_present = ->(x) { !x.present? }

    case [CustomLandingPage::LandingPageStore.enabled?(community.id),
          user,
          locale_param]
    when matches([true, not_present, non_default_locale])
      paths.search_with_locale_path(o)
    when matches([true, __, __])
      paths.search_without_locale_path(o.merge(locale: nil))
    when matches([false, not_present, non_default_locale])
      paths.homepage_with_locale_path(o)
    when matches([false, __, __])
      paths.homepage_without_locale_path(o.merge(locale: nil))
    end
  end

  def search_url(community, opts = {})
    case [CustomLandingPage::LandingPageStore.enabled?(community.id),
          opts[:locale].present?]
    when matches([true, true])
      paths.search_with_locale_url(opts)
    when matches([true, false])
      paths.search_without_locale_url(opts.merge(locale: nil))
    when matches([false, true])
      paths.homepage_with_locale_url(opts)
    when matches([false, false])
      paths.homepage_without_locale_url(opts.merge(locale: nil))
    end
  end

  def landing_page_path(community, user, locale_param)
    non_default_locale = ->(locale) { locale && locale != community.default_locale.to_s}
    not_present = ->(x) { !x.present? }

    case [CustomLandingPage::LandingPageStore.enabled?(community.id), user, locale_param]
    when matches([true, __, __])
      paths.landing_page_without_locale_path(locale: nil)
    when matches([false, not_present, non_default_locale])
      paths.homepage_with_locale_path
    else
      paths.homepage_without_locale_path(locale: nil)
    end
  end


  def paths
    Rails.application.routes.url_helpers
  end

end
